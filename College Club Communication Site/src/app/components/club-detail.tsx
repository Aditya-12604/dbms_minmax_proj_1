import { useParams, Link } from "react-router";
import { ArrowLeft, Users, Mail, Calendar, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockClubs, mockJobs } from "../data/mock-data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ClubDetail() {
  const { id } = useParams();
  const club = mockClubs.find(c => c.id === id);
  const clubJobs = mockJobs.filter(j => j.clubId === id);

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Club not found</h1>
          <Link to="/clubs">
            <Button variant="outline">Back to Clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getClubImage = (id: string) => {
    const images = {
      '1': 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzAxNzIyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '2': 'https://images.unsplash.com/photo-1740174459718-fdcc63ee3b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcwMTcxMTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '3': 'https://images.unsplash.com/photo-1716703432455-3045789de738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjB0ZWFtfGVufDF8fHx8MTc3MDI1MTMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '4': 'https://images.unsplash.com/photo-1606043580455-bd22074d1e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmF8ZW58MXx8fHwxNzcwMjU1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '5': 'https://images.unsplash.com/photo-1768323102367-3b324501f01d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMjU1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '6': 'https://images.unsplash.com/photo-1761618291331-535983ae4296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzAyMDYyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    };
    return images[id as keyof typeof images] || images['1'];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/clubs">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Clubs
          </Button>
        </Link>

        {/* Club Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <ImageWithFallback 
            src={getClubImage(club.id)}
            alt={club.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
                  <Badge variant="secondary">{club.category}</Badge>
                </div>
                <p className="text-lg text-gray-600">{club.description}</p>
              </div>
              <Button>Join Club</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Members</div>
                  <div className="font-semibold text-gray-900">{club.memberCount}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Established</div>
                  <div className="font-semibold text-gray-900">{club.established}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Contact</div>
                  <div className="font-semibold text-gray-900 text-sm">{club.contact}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Club Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Opportunities</h2>
            <span className="text-sm text-gray-600">{clubJobs.length} open positions</span>
          </div>

          {clubJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {clubJobs.map((job) => (
                <Link key={job.id} to={`/jobs/${job.id}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <Badge>{job.status}</Badge>
                      </div>
                      <CardDescription className="text-sm text-gray-600">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline">+{job.skills.length - 3}</Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-green-600">{job.budget}</span>
                        <span className="text-gray-600">{job.applicants} applicants</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No opportunities posted yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
