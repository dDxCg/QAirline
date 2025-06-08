import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import profileServices from "@/services/profileServices";
import toast from "react-hot-toast";

interface UserProfile {
  full_name: string;
  date_of_birth: Date;
  gender: "male" | "female";
  nationality: string;
  id_number: string;
  passport_number: string;
  passport_expiry_date: string;
  phone_number: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email] = useState(
    () => localStorage.getItem("email") || "sample@example.com"
  );
  const [profile, setProfile] = useState<UserProfile>({
    full_name: "",
    date_of_birth: new Date("2000-01-01"), // Default to today as yyyy-mm-dd
    gender: "male",
    nationality: "",
    id_number: "",
    passport_number: "",
    passport_expiry_date: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await profileServices.getProfile();
        if (profile) {
          setProfile({
            full_name: profile.full_name,
            date_of_birth: profile.date_of_birth,
            gender: profile.gender,
            nationality: profile.nationality,
            id_number: profile.id_number,
            passport_number: profile.passport_number,
            passport_expiry_date: profile.passport_expiry_date,
            phone_number: profile.phone_number,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle profile update
    profileServices
      .updateProfile(profile)
      .then(() => {
        // Optionally, show a success message
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update profile: " + error.message);
      });
    setIsEditing(false);
  };

  return (
    <Layout>
      <Container className="py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <Button
              variant={isEditing ? "outline" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter full name"
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  disabled={true}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  value={
                    profile.date_of_birth instanceof Date
                      ? profile.date_of_birth.toISOString().slice(0, 10)
                      : profile.date_of_birth
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      date_of_birth: new Date(e.target.value),
                    })
                  }
                  disabled={!isEditing}
                  placeholder="mm/dd/yyyy"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={profile.phone_number}
                  onChange={(e) =>
                    setProfile({ ...profile, phone_number: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                />

                <Input
                  label="ID Number"
                  value={profile.id_number}
                  onChange={(e) =>
                    setProfile({ ...profile, id_number: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter ID number"
                />

                <Input
                  label="Nationality"
                  value={profile.nationality}
                  onChange={(e) =>
                    setProfile({ ...profile, nationality: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter nationality"
                />

                <Input
                  label="Passport Number"
                  value={profile.passport_number}
                  onChange={(e) =>
                    setProfile({ ...profile, passport_number: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Enter passport number"
                />

                <Input
                  label="Passport Expiry Date"
                  value={profile.passport_expiry_date}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      passport_expiry_date: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  placeholder="mm/yy"
                />

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    {["male", "female"].map((option) => (
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
                              gender: e.target.value as UserProfile["gender"],
                            })
                          }
                          disabled={!isEditing}
                          className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                        <span className="text-gray-900 capitalize">
                          {option}
                        </span>
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
