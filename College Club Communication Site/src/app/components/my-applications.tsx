import { Link } from "react-router";
import { FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { mockApplications } from "../data/mock-data";

export function MyApplications() {
  const pendingApps = mockApplications.filter(app => app.status === 'pending');
  const acceptedApps = mockApplications.filter(app => app.status === 'accepted');
  const rejectedApps = mockApplications.filter(app => app.status === 'rejected');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const ApplicationCard = ({ app }: { app: typeof mockApplications[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2">{app.jobTitle}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {app.clubName}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(app.status)}
            <Badge className={getStatusColor(app.status)}>
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Your Proposal</h4>
            <p className="text-sm text-gray-600">{app.proposal}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-600">
              Applied on {new Date(app.appliedDate).toLocaleDateString()}
            </span>
            <Link to={`/jobs/${app.jobId}`}>
              <Button variant="outline" size="sm">
                View Job
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your job applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockApplications.length}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {pendingApps.length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {acceptedApps.length}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({mockApplications.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingApps.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted ({acceptedApps.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {mockApplications.length > 0 ? (
              mockApplications.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No applications yet</p>
                  <Link to="/jobs">
                    <Button>Browse Opportunities</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingApps.length > 0 ? (
              pendingApps.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No pending applications</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="mt-6 space-y-4">
            {acceptedApps.length > 0 ? (
              acceptedApps.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No accepted applications yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-6 space-y-4">
            {rejectedApps.length > 0 ? (
              rejectedApps.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No rejected applications</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
