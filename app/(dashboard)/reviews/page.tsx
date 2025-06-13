import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Star, MessageSquareText, Send, SearchCheck, TrendingUp, BarChart3 } from 'lucide-react'; // Relevant icons

const ReviewsPage = () => {
  // Mock data for overview - will be replaced by API calls
  const overviewStats = {
    totalReviews: 785,
    averageRating: 4.6,
    newReviewsThisMonth: 62,
    reviewRequestsSent: 350,
  };

  // Mock data for a simple chart
  const ratingOverTime = [
    { month: 'Jan', rating: 4.2, color: 'hsl(142.1 76.2% 42.2%)' }, // Green
    { month: 'Feb', rating: 4.4, color: 'hsl(142.1 76.2% 42.2%)' },
    { month: 'Mar', rating: 4.3, color: 'hsl(38.3 95.8% 53.1%)' }, // Amber for slight dip
    { month: 'Apr', rating: 4.5, color: 'hsl(142.1 76.2% 42.2%)' },
    { month: 'May', rating: 4.6, color: 'hsl(142.1 76.2% 42.2%)' },
  ];
  const maxRating = 5;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Reviews Management" subtitle="Monitor, request, and boost your customer reviews." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard
            title="Total Reviews"
            value={overviewStats.totalReviews.toLocaleString()}
            icon={<MessageSquareText className="text-blue-600" />}
            change="+12 last week"
            changeColor="text-green-600"
          />
          <QualityMetricCard
            title="Average Rating"
            value={overviewStats.averageRating.toFixed(1)}
            unit="/ 5"
            icon={<Star className="text-amber-500" />}
            change="-0.1 from last month"
            changeColor="text-red-600"
          />
          <QualityMetricCard
            title="New Reviews This Month"
            value={overviewStats.newReviewsThisMonth.toLocaleString()}
            icon={<TrendingUp className="text-emerald-600" />}
          />
          <QualityMetricCard
            title="Review Requests Sent"
            value={overviewStats.reviewRequestsSent.toLocaleString()}
            icon={<Send className="text-purple-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Navigation to Subpages */}
          <Link href="/reviews/requests" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <Send size={20} className="mr-3 text-blue-600 group-hover:text-blue-700" />
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Review Requests</h3>
            </div>
            <p className="text-sm text-gray-600">Manage and send out review requests to your customers.</p>
          </Link>

          <Link href="/reviews/booster" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <Star size={20} className="mr-3 text-amber-600 group-hover:text-amber-700" />
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Review Booster</h3>
            </div>
            <p className="text-sm text-gray-600">Utilize tools and campaigns to boost positive review generation.</p>
          </Link>

          <Link href="/reviews/monitoring" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <SearchCheck size={20} className="mr-3 text-emerald-600 group-hover:text-emerald-700" />
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Review Monitoring</h3>
            </div>
            <p className="text-sm text-gray-600">Track new reviews from various platforms and respond to feedback.</p>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center">
            <BarChart3 className="mr-2 text-gray-500" /> Average Rating Over Time
          </h2>
          <div className="h-64 p-4 rounded flex flex-col space-y-2">
            {ratingOverTime.map(item => (
              <div key={item.month} className="flex items-center">
                <span className="w-12 text-xs text-gray-500">{item.month}</span>
                <div className="flex-grow bg-gray-100 rounded-full h-6 mr-2">
                    <div
                      className="h-6 rounded-full"
                      style={{ width: `${(item.rating / maxRating) * 100}%`, backgroundColor: item.color }}
                      title={`Rating: ${item.rating}`}
                    ></div>
                </div>
                <span className="text-xs text-gray-600 w-8 text-right">{item.rating.toFixed(1)}</span>
              </div>
            ))}
             {ratingOverTime.length === 0 && <p className="text-sm text-gray-500">No rating data available yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
