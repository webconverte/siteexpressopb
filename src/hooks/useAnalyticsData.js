import { useState, useEffect, useCallback, useRef } from 'react';
import { 
    fetchAnalyticsData, 
    getAllSavedConfigs, 
    saveConfig, 
    saveAllConfigs 
} from '../services/analyticsService';

export const useAnalyticsData = (initialPeriod = '30d', initialProperty = 'site') => {
    const [property, setProperty] = useState(initialProperty);
    const [period, setPeriod] = useState(initialPeriod);
    const [cache, setCache] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allConfigs, setAllConfigsState] = useState(getAllSavedConfigs());

    const cacheRef = useRef({});
    cacheRef.current = cache;

    const config = allConfigs[property] || allConfigs.site;
    const cacheKey = `${property}_${period}`;
    // Retorna os dados se e somente se pertencerem exatamente à propriedade ativa
    const activeData = cache[cacheKey];
    const data = (activeData && activeData.property === property) ? activeData : null;

    const loadData = useCallback(async (activeProp, selectedPeriod, force = false) => {
        const key = `${activeProp}_${selectedPeriod}`;
        const existing = cacheRef.current[key];

        if (!force && existing && existing.property === activeProp) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await fetchAnalyticsData(activeProp, selectedPeriod);
            setCache(prev => {
                const next = { ...prev, [key]: result };
                cacheRef.current = next;
                return next;
            });
        } catch (err) {
            setError(err.message || `Erro ao carregar dados de ${activeProp}.`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(property, period);
    }, [property, period, loadData]);

    const handlePropertyChange = (newProperty) => {
        if (newProperty === property) return;
        setProperty(newProperty);
        const nextKey = `${newProperty}_${period}`;
        const cached = cacheRef.current[nextKey];
        if (cached && cached.property === newProperty) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    };

    const handlePeriodChange = (newPeriod) => {
        if (newPeriod === period) return;
        setPeriod(newPeriod);
        const nextKey = `${property}_${newPeriod}`;
        const cached = cacheRef.current[nextKey];
        if (cached && cached.property === property) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    };

    const handleRefresh = () => {
        loadData(property, period, true);
    };

    const handleUpdateConfig = (targetProperty, newConfig) => {
        if (typeof targetProperty === 'object' && targetProperty !== null) {
            newConfig = targetProperty;
            targetProperty = property;
        }
        saveConfig(targetProperty, newConfig);
        const updated = getAllSavedConfigs();
        setAllConfigsState(updated);
        // Limpar cache da propriedade alterada para forçar recarga
        setCache(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(k => {
                if (k.startsWith(`${targetProperty}_`)) {
                    delete next[k];
                }
            });
            cacheRef.current = next;
            return next;
        });
        loadData(property, period, true);
    };

    const handleUpdateAllConfigs = (newAllConfigs) => {
        saveAllConfigs(newAllConfigs);
        setAllConfigsState(newAllConfigs);
        setCache({});
        cacheRef.current = {};
        loadData(property, period, true);
    };

    return {
        property,
        setProperty: handlePropertyChange,
        period,
        setPeriod: handlePeriodChange,
        data,
        loading: loading || !data,
        error,
        refresh: handleRefresh,
        config,
        allConfigs,
        updateConfig: handleUpdateConfig,
        updateAllConfigs: handleUpdateAllConfigs
    };
};

export default useAnalyticsData;
