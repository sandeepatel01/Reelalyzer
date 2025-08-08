import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { ReelAnalysisResponseUI } from "@/types/index";

export function UserProfile({
  owner,
}: {
  owner: ReelAnalysisResponseUI["owner"];
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={owner.profilePicUrl} alt={owner.username} />
            <AvatarFallback>
              {owner.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              @{owner.username}
              {owner.isVerified && (
                <Icons.verified className="h-4 w-4 text-blue-500" />
              )}
            </h2>
            {/* <p className="text-sm text-muted-foreground">{owner.bio}</p> */}
          </div>

          <div className="flex gap-4 text-center">
            <div>
              <p className="font-semibold">
                S4
                {/* {owner.followers.toLocaleString()} */}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-semibold">
                S4
                {/* {owner.following.toLocaleString()} */}
              </p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {/* {owner.isBusiness && (
              <Badge variant="secondary">
                <Icons.briefcase className="h-3 w-3 mr-1" />
                Business
              </Badge>
            )}
            {owner.isProfessional && (
              <Badge variant="secondary">
                <Icons.star className="h-3 w-3 mr-1" />
                Creator
              </Badge>
            )} */}

            <Badge variant="secondary">
              <Icons.briefcase className="h-3 w-3 mr-1" />
              Business
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
