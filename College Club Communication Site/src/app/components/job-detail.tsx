import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { mockJobs } from "../data/mock-data";
import { toast } from "sonner";

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === id);
  const [proposal, setProposal] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Opportunity not found</h1>
          <Link to="/jobs">
            <Button variant="outline">Back to Opportunities</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitApplication = () => {
    if (!proposal.trim()) {
      toast.error("Please write a proposal before submitting");
      return;
    }
    
    toast.success("Application submitted successfully!");
    setIsDialogOpen(false);
    setProposal("");
    
    // Navigate to applications page after a short delay
    setTimeout(() => {
      navigate("/my-applications");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/jobs">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Opportunities
          </Button>
        </Link>

        {/* Job Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <Badge>{job.status}</Badge>
                </div>
                <CardDescription className="text-base">
                  <Link to={`/clubs/${job.clubId}`} className="text-blue-600 hover:underline">
                    {job.clubName}
                  </Link>
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" disabled={job.status !== 'open'}>
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Submit Your Application</DialogTitle>
                    <DialogDescription>
                      Tell the club why you're the right fit for this opportunity
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="proposal">Your Proposal</Label>
                      <Textarea
                        id="proposal"
                        placeholder="Describe your relevant experience, why you're interested, and how you plan to approach this project..."
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        className="min-h-[200px] mt-2"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitApplication}>
                        Submit Application
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Budget</div>
                  <div className="font-semibold text-sm">{job.budget}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Deadline</div>
                  <div className="font-semibold text-sm">{new Date(job.deadline).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Applicants</div>
                  <div className="font-semibold text-sm">{job.applicants}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Posted</div>
                  <div className="font-semibold text-sm">{new Date(job.postedDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* About the Club */}
        <Card>
          <CardHeader>
            <CardTitle>About {job.clubName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Learn more about the club and their current activities.
            </p>
            <Link to={`/clubs/${job.clubId}`}>
              <Button variant="outline">View Club Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
