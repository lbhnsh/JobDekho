import React from "react";

const Footer = () => {
  return (
    <footer className="text-white mt-20">
      <div className="overflow-x-hidden -mb-0.5">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "#1B7593",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
        </svg>
      </div>

      <div style={{ backgroundColor: '#1B7593' }}>
      <div style={{ maxWidth: '1200px', padding: '5rem 1.25rem', margin: '0 auto' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '-2.5rem' }}>
          <span style={{ position: 'absolute', left: '10%' }}>Vedant Mehra</span>
          <span style={{ position: 'absolute', left: '47%' }}>Niranjan More</span>
          <span style={{ position: 'absolute', left: '86%' }}>Labhansh Naik</span>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
