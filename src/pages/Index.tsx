import PortfolioHeader from '@/components/PortfolioHeader';
import PortfolioGrid from '@/components/PortfolioGrid';
import PortfolioFooter from '@/components/PortfolioFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-colors-bg-1 font-ibm-plex">
      <PortfolioHeader />
      <PortfolioGrid />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
