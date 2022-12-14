import Layout from '@/global//layouts/Layout';
import Resume from '@/global//components/Resume';
export default function projects() {
  return (
    <Layout resume={'navbar__resume'} title="_resume" pagetitle={'Resume | JetDev'} url="resume">
      <Resume />
    </Layout>
  );
}
