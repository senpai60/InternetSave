import PageLaout from "../../components/layout/PageLaout";
import { UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <PageLaout>
      <div className="pt-24 pb-12 flex flex-col items-center justify-center">
        <UserCircle className="w-24 h-24 text-zinc-700 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {user?.username}
        </h1>
        <p className="text-zinc-500">Profile management coming soon...</p>
      </div>
    </PageLaout>
  );
};

export default ProfilePage;
