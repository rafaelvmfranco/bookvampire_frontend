import { FaSpinner } from "react-icons/fa";

import { cn } from "~/core/libs/utils";

type SpinnerProps = {
  className?: string;
};
const Spinner = ({ className }: SpinnerProps): JSX.Element => {
  return <FaSpinner className={cn("animate-spin m-5", className)} />;
};

export default Spinner;
