import { useRouter } from "next/router";

import { Meta } from "../layout/Meta";

const Index = () => {
  const router = useRouter();

  return (
    <div>
      <Meta title="Mars" description="" />
    </div>
  );
};

export default Index;
