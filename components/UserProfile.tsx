import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ReelAnalysisResponseUI } from "@/types/index";

export function UserProfile({
  owner,
}: {
  owner: ReelAnalysisResponseUI["owner"];
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={owner.profilePicUrl} alt={owner.username} />
      </Avatar>
      <div>
        <p className="font-medium">@{owner.username}</p>
        {owner.isVerified && (
          <span className="text-xs text-blue-500">Verified</span>
        )}
      </div>
    </div>
  );
}
