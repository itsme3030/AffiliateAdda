import { FaUser, FaEnvelope, FaPhone, FaMapPin } from 'react-icons/fa';
import ProfileImageBG from '../../images/Profilebackground.jpg';
import ProfileImage from '../../images/ProfileImg.jpg';

export default function ProfileCard({ userDetail }) {
  const { firstName, lastName, email, phone, address, city, state, zip, country } = userDetail;

  let profilePictureBG = ProfileImageBG;
  let profilePicture = ProfileImage;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        <img
          src={profilePictureBG || 'https://via.placeholder.com/50'}
          alt="Profile Background"
          className="w-full h-48 object-cover"
        />
        {/* Profile Picture Overlay */}
        <div className="absolute top-16 left-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md">
          <img
            src={profilePicture || 'https://via.placeholder.com/50'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-cyan-100">Profile Information</h3>
        <div className="mt-6 space-y-4">
          {/* Full Name */}
          <div className="flex items-center text-sm text-gray-600 dark:text-cyan-300">
            <FaUser className="h-5 w-5 text-gray-400 mr-2" />
            <p>{`${firstName} ${lastName}`}</p>
          </div>

          {/* Email */}
          <div className="flex items-center text-sm text-gray-600 dark:text-cyan-300">
            <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
            <p>{email}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center text-sm text-gray-600 dark:text-cyan-300">
            <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
            <p>{phone}</p>
          </div>

          {/* Address */}
          <div className="flex items-center text-sm text-gray-600 dark:text-cyan-300">
            <FaMapPin className="h-5 w-5 text-gray-400 mr-2" />
            <p>{`${address}, ${city}, ${state} ${zip}, ${country}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
