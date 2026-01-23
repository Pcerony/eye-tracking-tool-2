import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { GazePlot } from "./GazePlot";
import { Heatmap } from "./Heatmap";

interface ReportProps {
  data: {
    image: string;
    gazeData: Array<{ x: number; y: number; timestamp: number }>;
    timestamp: string;
  };
  onBack: () => void;
}

export function Report({ data, onBack }: ReportProps) {
  const totalTime = data.gazeData.length > 0 
    ? (data.gazeData[data.gazeData.length - 1].timestamp - data.gazeData[0].timestamp) / 1000 
    : 0;

  const pointsCount = data.gazeData.length;

  return (
    <div className="container py-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analysis Report</h1>
            <p className="text-muted-foreground">
              Generated on {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 w-4 h-4" />
            Share
          </Button>
          <Button>
            <Download className="mr-2 w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTime.toFixed(1)}s</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pointsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Focus Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">High</div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Tabs */}
      <Tabs defaultValue="heatmap" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="gazeplot">Gaze Plot</TabsTrigger>
        </TabsList>
        
        <TabsContent value="heatmap" className="mt-6">
          <Card className="glass-panel overflow-hidden">
            <CardContent className="p-0 aspect-video relative">
              <Heatmap 
                imageUrl={data.image} 
                data={data.gazeData} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gazeplot" className="mt-6">
          <Card className="glass-panel overflow-hidden">
            <CardContent className="p-0 aspect-video relative">
              <GazePlot 
                imageUrl={data.image} 
                data={data.gazeData} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
