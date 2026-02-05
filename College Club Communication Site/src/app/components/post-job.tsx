import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { mockClubs } from "../data/mock-data";
import { toast } from "sonner";

export function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    clubId: "",
    description: "",
    skills: "",
    budget: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.clubId || !formData.description || !formData.budget || !formData.deadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Opportunity posted successfully!");
    
    // Navigate to jobs page after a short delay
    setTimeout(() => {
      navigate("/jobs");
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="gap-2 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Opportunity</h1>
          <p className="text-gray-600">Find talented students to help with your club projects</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
            <CardDescription>
              Provide clear information to attract the right candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Website Developer, Graphic Designer..."
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Club */}
              <div>
                <Label htmlFor="club">Select Club *</Label>
                <Select value={formData.clubId} onValueChange={(value) => handleChange("clubId", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a club" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClubs.map((club) => (
                      <SelectItem key={club.id} value={club.id}>
                        {club.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project, requirements, and expectations..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Be specific about what you need and what success looks like
                </p>
              </div>

              {/* Skills */}
              <div>
                <Label htmlFor="skills">Required Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Photoshop, Content Writing (comma separated)"
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple skills with commas
                </p>
              </div>

              {/* Budget */}
              <div>
                <Label htmlFor="budget">Budget *</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $100-$200 or $150/month"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Deadline */}
              <div>
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  className="mt-2"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Post Opportunity
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">Tips for a Great Post</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Be clear and specific about the scope of work</li>
              <li>• List all required skills and any nice-to-have skills</li>
              <li>• Set a realistic budget and timeline</li>
              <li>• Include how applicants will be evaluated</li>
              <li>• Respond promptly to applications</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
