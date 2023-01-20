import { FC } from 'react';
import { Hero } from '../../components/Hero/Hero';
import { Overview } from '../../components/Overview/Overview';
import { LatestProduct } from '../../components/LatestProduct/LatestProduct';
import { TopSelling } from '../../components/TopSelling/TopSelling';
import { Subscription } from '../../components/Subs/Subscription';
import { Banner } from '../../components/Banner/Banner';

const Home: FC = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Overview />
      </section>
      <section>
        <LatestProduct />
      </section>
      <section>
        <TopSelling />
      </section>
      <section>
        <Subscription />
      </section>
      <section>
        <Banner />
      </section>
    </>
  );
};

export default Home;
