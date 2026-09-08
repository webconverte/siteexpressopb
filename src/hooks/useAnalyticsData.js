import { useState, useEffect, useCallback } from 'react';
import { 
    fetchAnalyticsData, 
    getSavedConfig, 
    getAllSavedConfigs, 
    saveConfig, 
    saveAllConfigs 
} from '../services/analyticsService';

export const useAnalyticsData = (initialPeriod = '30d', initialProperty = 'site') => {
    const [property, setProperty] = useState(initialProperty);
    const [period, setPeriod] = useState(initialPeriod);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allConfigs, setAllConfigsState] = useState(getAllSavedConfigs());

    const config = allConfigs[property] || allConfigs.site;

    const loadData = useCallback(async (activeProp, selectedPeriod) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAnalyticsData(activeProp, selectedPeriod);
            setData(result);
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
        setProperty(newProperty);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const handleRefresh = () => {
        loadData(property, period);
    };

    const handleUpdateConfig = (targetProperty, newConfig) => {
        // Suporte para chamada com 1 argumento (default para a propriedade ativa)
        if (typeof targetProperty === 'object' && targetProperty !== null) {
            newConfig = targetProperty;
            targetProperty = property;
        }
        saveConfig(targetProperty, newConfig);
        const updated = getAllSavedConfigs();
        setAllConfigsState(updated);
        loadData(property, period);
    };

    const handleUpdateAllConfigs = (newAllConfigs) => {
        saveAllConfigs(newAllConfigs);
        setAllConfigsState(newAllConfigs);
        loadData(property, period);
    };

    return {
        property,
        setProperty: handlePropertyChange,
        period,
        setPeriod: handlePeriodChange,
        data,
        loading,
        error,
        refresh: handleRefresh,
        config,
        allConfigs,
        updateConfig: handleUpdateConfig,
        updateAllConfigs: handleUpdateAllConfigs
    };
};

export default useAnalyticsData;
