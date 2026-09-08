import { useState, useEffect, useCallback } from 'react';
import { fetchAnalyticsData, getSavedConfig, saveConfig } from '../services/analyticsService';

export const useAnalyticsData = (initialPeriod = '30d') => {
    const [period, setPeriod] = useState(initialPeriod);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [config, setConfigState] = useState(getSavedConfig());

    const loadData = useCallback(async (selectedPeriod) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAnalyticsData(selectedPeriod);
            setData(result);
        } catch (err) {
            setError(err.message || 'Erro ao carregar dados do dashboard.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(period);
    }, [period, loadData]);

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const handleRefresh = () => {
        loadData(period);
    };

    const handleUpdateConfig = (newConfig) => {
        saveConfig(newConfig);
        setConfigState(newConfig);
        loadData(period);
    };

    return {
        period,
        setPeriod: handlePeriodChange,
        data,
        loading,
        error,
        refresh: handleRefresh,
        config,
        updateConfig: handleUpdateConfig
    };
};

export default useAnalyticsData;
