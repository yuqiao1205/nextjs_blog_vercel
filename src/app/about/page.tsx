import Image from 'next/image';
import './about.css';
import type { Metadata } from "next";

// 当人搜索关于我的时候，显示的meta信息
export const metadata: Metadata = {
  title: "About Page",
  description: "About page for Lauren's Next.js Blog",
};

const AboutPage = () => {
  return (
    <>
    <div className="about-container">
      <div className="about-text-container">
        <h2 className='subtitle'>About Me</h2>
        <h1 className='about-title'>Lauren, a passionate tech enthusiast</h1>
        <p className='about-description'>
          Hi there! I&apos;m Lauren, a software developer with a deep passion for
          technology and innovation. With over a decade of experience in the tech
          industry, I have honed my skills in various programming languages,
          frameworks, and tools. My journey began with a fascination for how
          technology can solve real-world problems, and it has since evolved into
          a career dedicated to creating impactful solutions.
        </p>
        <p>
          In my free time, I enjoy exploring new technologies, contributing to open-source projects, and sharing my knowledge through blogging and speaking engagements. I believe in the power of community and collaboration, and I&apos;m always eager to connect with fellow tech enthusiasts.
        </p>
        <div className="boxes">
          <div className="box">
            <h3>10 K+</h3>
            <p>
              Years of experience
            </p>
          </div>
          <div className="box">
            <h3>10 K+</h3>
            <p>
              Years of coding experience
            </p>
          </div>
          <div className="box">
            <h3>10 K+</h3>
            <p>
              Years of community involvement
            </p>
          </div>
        </div>
   
      </div>
      <div className="about-image-container">
        <Image
          src="/about.png"
          alt="Lauren's profile picture"
          fill
          className="about-image"
          priority
        />
      </div>
    </div>
    </>
  );
};

export default AboutPage;