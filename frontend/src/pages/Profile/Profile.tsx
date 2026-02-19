import { Building2, GraduationCap, Mail } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const user = {
    name: 'Alex Student',
    email: 'alex@uni.edu',
    dept: 'Computer Science',
    position: 'Undergraduate',
    bio: 'Passionate about full-stack development and relational database optimization. Currently working on a 3NF research management tool.',
    papers: 5
  };

  return (
    <div className="profile-page page-enter mx-auto max-w-4xl px-4 py-8">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="profile-header-gradient h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative mb-6 -mt-12 flex items-end justify-between load-fade-up">
            <div className="avatar-ring glass-soft rounded-full p-1">
              <div className="bg-soft text-muted flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold">
                AS
              </div>
            </div>
            <button className="btn-primary-fixed">Edit Profile</button>
          </div>

          <h2 className="text-emphasis load-fade-up stagger-1 text-2xl font-bold">{user.name}</h2>
          <div className="text-muted load-fade-up stagger-2 mt-2 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Mail size={16} /> {user.email}
            </span>
            <span className="flex items-center gap-1">
              <Building2 size={16} /> {user.dept}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap size={16} /> {user.position}
            </span>
          </div>

          <div className="bio-box glass-soft load-fade-up stagger-3 mt-8 rounded-xl p-4">
            <h4 className="text-emphasis mb-2 text-xs font-bold uppercase">About Me</h4>
            <p className="text-normal leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
