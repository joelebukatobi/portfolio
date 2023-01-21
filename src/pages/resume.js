import Layout from '@/global//layouts/Layout';
import Resume from '@/global//components/Resume';
export default function projects() {
  return (
    <Layout
      resume={'navbar__resume'}
      header="_resume"
      site_name={'Resume | JetDev'}
      url="https://www.joelebukatobi.dev/resume"
    >
      <Resume />
    </Layout>
  );
}
