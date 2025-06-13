import { LoadingSkeleton } from "@/components/core/loading/LoadingSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="min-h-screen space-y-8 bg-gray-50/50 p-6 md:p-10">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <LoadingSkeleton width="300px" height="36px" className="mb-2" />
          <LoadingSkeleton width="350px" height="20px" />
        </div>
        {/* Placeholder for potential top-right controls or buttons */}
      </div>

      {/* Filter Skeletons */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row justify-start items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <LoadingSkeleton width="80px" height="16px" /> {/* Label */}
            <LoadingSkeleton width="200px" height="40px" /> {/* Select */}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <LoadingSkeleton width="60px" height="16px" /> {/* Label */}
            <LoadingSkeleton width="180px" height="40px" /> {/* Select */}
          </div>
        </div>
      </div>

      {/* Summary Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-white border-none shadow-sm">
            <CardHeader>
              <LoadingSkeleton width="60%" height="20px" className="mb-1" /> {/* Title */}
              <LoadingSkeleton width="40%" height="28px" /> {/* Value */}
            </CardHeader>
            <CardContent>
              <LoadingSkeleton width="80%" height="16px" /> {/* Description/Change */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <LoadingSkeleton width="40%" height="24px" /> {/* Chart Title */}
          </CardHeader>
          <CardContent>
            <LoadingSkeleton width="100%" height="250px" /> {/* Chart Area */}
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <LoadingSkeleton width="50%" height="24px" /> {/* Chart Title */}
          </CardHeader>
          <CardContent>
            <LoadingSkeleton width="100%" height="250px" /> {/* Chart Area */}
          </CardContent>
        </Card>
      </div>
      
      {/* Per-VSL Table Skeleton */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <LoadingSkeleton width="30%" height="24px" /> {/* Table Title */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><LoadingSkeleton width="30%" height="16px" /></TableHead>
                <TableHead><LoadingSkeleton width="15%" height="16px" /></TableHead>
                <TableHead><LoadingSkeleton width="15%" height="16px" /></TableHead>
                <TableHead><LoadingSkeleton width="20%" height="16px" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell><LoadingSkeleton width="90%" height="14px" /></TableCell>
                  <TableCell><LoadingSkeleton width="70%" height="14px" /></TableCell>
                  <TableCell><LoadingSkeleton width="70%" height="14px" /></TableCell>
                  <TableCell><LoadingSkeleton width="80%" height="14px" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
