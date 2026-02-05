import { Link } from "react-router";
import { ArrowRight, Users, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockClubs, mockJobs } from "../data/mock-data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Home() {
  const featuredClubs = mockClubs.slice(0, 3);
  const recentJobs = mockJobs.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Connect. Collaborate. Create.
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Find opportunities within your college clubs and committees. Build your portfolio while helping your community thrive.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Browse Opportunities
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MDIxODk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students collaborating"
                className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Active Clubs</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">120+</div>
                <div className="text-sm text-gray-600">Opportunities Posted</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Successful Collaborations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Featured Clubs</h3>
              <p className="text-gray-600 mt-2">Discover active clubs on campus</p>
            </div>
            <Link to="/clubs">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <Link key={club.id} to={`/clubs/${club.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="p-0">
                    <ImageWithFallback 
                      src={
                        club.id === '1' ? 'assets/techno.jpg' :
                        club.id === '2' ? 'assets/prati.jpg' :
                        'assets/ecell.jpg'
                      }
                      alt={club.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{club.name}</CardTitle>
                      <Badge variant="secondary">{club.category}</Badge>
                    </div>
                    <CardDescription className="mb-3">{club.description}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{club.memberCount} members</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Recent Opportunities</h3>
              <p className="text-gray-600 mt-2">Find projects that match your skills</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentJobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <Badge>{job.status}</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-600">{job.clubName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Join ClubConnect today and start collaborating with your fellow students on exciting projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/profile">
              <Button size="lg" className="gap-2">
                Create Your Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/clubs">
              <Button size="lg" variant="outline">
                Explore Clubs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
