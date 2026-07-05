"use client";

import {
  Crown,
  Sparkles,
  Shield,
  CreditCard,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  Star,
  Upload,
  Eye,
} from "lucide-react";

type IconName =
  | "crown"
  | "spark"
  | "shield"
  | "card"
  | "users"
  | "calendar"
  | "check"
  | "reject"
  | "delete"
  | "star"
  | "upload"
  | "eye";

const lucideIconMap: Record<IconName, React.ReactNode> = {
  crown: <Crown className="w-full h-full" />,
  spark: <Sparkles className="w-full h-full" />,
  shield: <Shield className="w-full h-full" />,
  card: <CreditCard className="w-full h-full" />,
  users: <Users className="w-full h-full" />,
  calendar: <Calendar className="w-full h-full" />,
  check: <CheckCircle className="w-full h-full" />,
  reject: <XCircle className="w-full h-full" />,
  delete: <Trash2 className="w-full h-full" />,
  star: <Star className="w-full h-full" />,
  upload: <Upload className="w-full h-full" />,
  eye: <Eye className="w-full h-full" />,
};

export type AnimatedIconProps = {
  animationData: any;
  className?: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
};

export function AnimatedIcon({
  animationData,
  className,
  size = 24,
  loop = true,
  autoplay = true,
}: AnimatedIconProps) {
  // Infer the icon name from the animation data's name property
  const iconName = (animationData?.nm as IconName) || "spark";
  const icon = lucideIconMap[iconName] || lucideIconMap.spark;

  return (
    <div
      className={`text-gold ${className || ""}`}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}
