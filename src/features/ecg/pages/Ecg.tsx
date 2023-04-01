import { Layout } from '../../../components/layouts';
import { Chart, Controls } from '../components';
import { EcgProvider } from '../context';

export function Ecg() {
  return (
    <EcgProvider>
      <Layout>
        <Chart />
        <Controls />
      </Layout>
    </EcgProvider>
  );
}
