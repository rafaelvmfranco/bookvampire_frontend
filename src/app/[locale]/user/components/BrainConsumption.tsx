import { useTranslations } from "next-intl";
import { GiBrain } from "react-icons/gi";

import type { UserStats } from "~/core/libs/types/User";

export const BrainConsumption = (userStats: UserStats): JSX.Element => {
  const { current_brain_size, max_brain_size } = userStats;
  const brainFilling = current_brain_size / max_brain_size;
  const t = useTranslations("user");

  const backgroundIcon = (
    <GiBrain
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      className="fill-green-200 stroke-black stroke-1"
    />
  );

  const fillingIcon = (
    <GiBrain
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        clipPath: `inset(${(1 - brainFilling) * 100}% 0 0 0)`,
      }}
      className="stoke-1 fill-pink-300 stroke-black"
    />
  );

  return (
    <div className="flex w-fit flex-col items-center justify-center">
      <div className="relative h-24 w-24">
        {backgroundIcon}
        {fillingIcon}
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">
          {/* Percentage of book space left */}
          {(100 - brainFilling * 100).toFixed(2)}%{" "}
        </span>
        <span className="text-sm opacity-50">{t("empty", { ns: "user" })}</span>
      </div>
    </div>
  );
};
