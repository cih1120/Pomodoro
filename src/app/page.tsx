import Image from "next/image";
import TimeDashboard from "../components/TimeDashboard";

export default function Home() {
  return (
    <section className="flex justify-center">
      <TimeDashboard />
    </section>
  );
}
