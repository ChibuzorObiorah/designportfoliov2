import PortfolioHeader from '@/components/PortfolioHeader';
import PortfolioGrid from '@/components/PortfolioGrid';
import PortfolioFooter from '@/components/PortfolioFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-bg font-ibm-plex">
      <PortfolioHeader />
      <PortfolioGrid />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
