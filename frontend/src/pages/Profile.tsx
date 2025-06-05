import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

interface UserProfile {
  name: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  idNumber: string;
  passportNumber: string;
  gender: 'male' | 'female' | 'other';
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ta Lang',
    email: 'djtmemay@gmail.com',
    dateOfBirth: '2000-03-10',
    phone: '098818833',
    idNumber: '323233232',
    passportNumber: '2332323',
    gender: 'male',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle profile update
    setIsEditing(false);
  };

  return (
    <Layout>
      <Container className="py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <Button
              variant={isEditing ? 'outline' : 'primary'}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <Input
                  label="ID Number"
                  value={profile.idNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, idNumber: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <Input
                  label="Passport Number"
                  value={profile.passportNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, passportNumber: e.target.value })
                  }
                  disabled={!isEditing}
                />

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    {['male', 'female', 'other'].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={profile.gender === option}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              gender: e.target.value as UserProfile['gender'],
                            })
                          }
                          disabled={!isEditing}
                          className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                        <span className="text-gray-900 capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default Profile; 