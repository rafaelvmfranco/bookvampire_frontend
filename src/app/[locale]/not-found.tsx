import Image from "next/image";
import Link from "next/link";
import styles from "./n.module.scss";
import { images } from "~/images";

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.notFoundContainer}>
      <Image
        src={images.vampAndScreen}
        alt="Page Not Found"
        width={500}
        height={300}
      />
      <h1 className={styles.title}>Oops! Page not found.</h1>
      <p className={styles.description}>
        We can't seem to find the page you're looking for.
      </p>
      <Link href="/" className={styles.homeLink}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
