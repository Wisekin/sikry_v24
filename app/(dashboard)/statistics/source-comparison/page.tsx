"use client";

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Database, TrendingUp, BarChart3 as BarChart3Icon, Filter as FilterIcon, AlertCircle } from 'lucide-react';

// Import chart components
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ApiDataSourceComparisonMetric {
  source_id: string;
  source_name: string;
  data_volume: number;
  quality_score?: number;
  coverage_percent?: number;
  update_frequency?: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Ad-hoc';
  color_hint?: string;
}

interface ApiSummaryStats {
    total_sources_compared: number;
    highest_volume_source?: { name: string; volume: number };
    best_quality_source?: { name:string; score: number };
}

interface SourceComparisonAPIData {
  filter_summary: {
    metric_type_filter?: string;
    period_filter?: string;
  };
  sources_metrics: ApiDataSourceComparisonMetric[];
  summary_stats: ApiSummaryStats;
}


const chartConfig = {
  count: {
    label: "Records",
    color: "hsl(200 70% 50%)",
  },
} satisfies ChartConfig;

const SourceComparisonPage = () => {
  const { t } = useTranslation(['sourceComparisonPage', 'common']);
  const [apiData, setApiData] = useState<SourceComparisonAPIData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [minRecordsFilter, setMinRecordsFilter] = useState<number>(0);
  const [minQualityFilter, setMinQualityFilter] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const queryParams = new URLSearchParams();
    if (sourceFilter) queryParams.append('source', sourceFilter);
    if (minRecordsFilter) queryParams.append('minRecords', minRecordsFilter.toString());
    if (minQualityFilter) queryParams.append('minQuality', minQualityFilter.toString());
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    fetch(`/api/statistics/source-comparison?${queryParams.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch source comparison data');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) throw new Error(responseData.error.message);
        setApiData(responseData.data);
      })
      .catch(err => { setError(err.message); setApiData(null); })
      .finally(() => setIsLoading(false));
  }, [sourceFilter, minRecordsFilter, minQualityFilter, startDate, endDate]);

  if (isLoading && !apiData) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader 
          title={t('loading.title')} 
          subtitle={t('loading.subtitle')} 
        />
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-32 rounded-lg bg-white" />
            <Skeleton className="h-32 rounded-lg bg-white" />
            <Skeleton className="h-32 rounded-lg bg-white" />
          </div>
          <Skeleton className="h-[450px] rounded-lg bg-white" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title={t('title')} subtitle={t('error.title')} />
        <div className="p-6 md:p-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200 flex flex-col items-center justify-center h-96">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">{t('error.title')}</h2>
            <p className="text-gray-600 text-center mb-4">{error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                const queryParams = new URLSearchParams();
                if (sourceFilter) queryParams.append('source', sourceFilter);
                if (minRecordsFilter) queryParams.append('minRecords', minRecordsFilter.toString());
                if (minQualityFilter) queryParams.append('minQuality', minQualityFilter.toString());
                if (startDate) queryParams.append('startDate', startDate);
                if (endDate) queryParams.append('endDate', endDate);

                fetch(`/api/statistics/source-comparison?${queryParams.toString()}`)
                  .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch source comparison data');
                    return res.json();
                  })
                  .then(responseData => {
                    if (responseData.error) throw new Error(responseData.error.message);
                    setApiData(responseData.data);
                  })
                  .catch(err => setError(err.message))
                  .finally(() => setIsLoading(false));
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm"
            >
              {t('error.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chartData = apiData?.data || [];
  const summaryStats = apiData?.summaryStats;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader 
        title={t('title')} 
        subtitle={t('subtitle')} 
      />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard 
            title={t('metrics.totalSources.title')} 
            value={t('metrics.totalSources.value', { count: summaryStats?.totalSources.toLocaleString() ?? 'N/A' })} 
            icon={<Database className="text-blue-600" />} 
          />
          <QualityMetricCard 
            title={t('metrics.topSource.title')} 
            value={t('metrics.topSource.value', {
              source: summaryStats?.topSource.name ?? 'N/A',
              count: summaryStats?.topSource.count.toLocaleString() ?? '0'
            })} 
            icon={<BarChart3Icon className="text-emerald-600" />} 
          />
          <QualityMetricCard 
            title={t('metrics.avgQuality.title')} 
            value={t('metrics.avgQuality.value', {
              score: summaryStats?.averageQualityScore.toFixed(1) ?? '0'
            })} 
            icon={<TrendingUp className="text-purple-600" />} 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
            <h2 className="text-xl font-semibold text-[#1B1F3B] flex items-center">
              <BarChart3Icon className="mr-2 text-gray-500" /> {t('chart.title')}
            </h2>
            <div className="flex items-center space-x-3">
              <select 
                value={sourceFilter} 
                onChange={(e) => setSourceFilter(e.target.value)} 
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('filters.source')}</option>
                {Object.entries(t('chart.sources', { returnObjects: true })).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              <input 
                type="number" 
                value={minRecordsFilter} 
                onChange={e => setMinRecordsFilter(Number(e.target.value))} 
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('filters.minRecords')}
              />
              <input 
                type="number" 
                value={minQualityFilter} 
                onChange={e => setMinQualityFilter(Number(e.target.value))} 
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('filters.minQuality')}
              />
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('filters.dateRange')}
              />
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('filters.dateRange')}
              />
            </div>
          </div>

          {isLoading && apiData ? (
            <Skeleton className="h-96 w-full rounded-md bg-slate-50 border-dashed border-gray-200" />
          ) : chartData.length > 0 ? (
            <div className="h-96 w-full mt-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <p className="text-center py-10 text-gray-500 h-96 flex items-center justify-center">
              {t('chart.noData')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceComparisonPage;