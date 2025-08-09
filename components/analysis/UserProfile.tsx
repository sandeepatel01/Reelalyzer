import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { ReelAnalysisResponseUI } from "@/types/index";

export function UserProfile({
  owner,
}: {
  owner: ReelAnalysisResponseUI["owner"];
}) {
  return (
    <Card className="bg-zinc-900/50 border border-zinc-800 rounded-xl shadow-lg hover:shadow-[#d87e36]/20 transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#d87e36] to-[#f0a15e] rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
            <Avatar className="h-24 w-24 relative border-2 border-zinc-800 group-hover:border-[#d87e36] transition-colors duration-300">
              <AvatarImage
                src={
                  owner.profilePicUrl ||
                  `https://unavatar.io/instagram/${owner.username}`
                }
                alt={owner.username}
                className="object-cover"
                onError={(e) => {
                  // Agar image load nahi hoti to fallback activate
                  const target = e.target as HTMLImageElement;
                  target.src = `https://unavatar.io/instagram/${owner.username}`;
                }}
              />
              <AvatarFallback className="bg-zinc-800 text-white font-medium">
                {owner.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Username with Verification Badge */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#d87e36] bg-clip-text text-transparent">
                @{owner.username}
              </h2>
              {owner.isVerified && (
                <Icons.verified className="h-5 w-5 text-[#d87e36] animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
