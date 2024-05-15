import React from "react";

const About = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '1.5rem 0' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column-reverse', gap: '2.5rem', alignItems: 'center', padding: '1.25rem' }}>
        <div style={{ width: '100%', flexBasis: '66.666667%', maxWidth: '50%' }}>
          <h1 style={{ fontSize: '1.875rem', color: '#1B7593', fontWeight: '700', marginTop: '1.25rem', top:'1%' }}>Our Team</h1>
          <p style={{ textAlign: 'justify', lineHeight: '2.25rem' }}>
                     Vedant Mehra : 221070039 
            <br></br>Niranjan More : 221070040 
            <br></br>Labhansh Naik : 221070041
            
          </p>
        </div>
        <div style={{ width: '100%', flexBasis: '66.666667%', maxWidth: '50%' }}>
          <h1 style={{ fontSize: '1.875rem', color: '#1B7593', fontWeight: '700', marginTop: '1.25rem', top:'1%' }}>About Us</h1>
          <p style={{ textAlign: 'justify', lineHeight: '2.25rem' }}>
          JobDekho is an MERN stack based Website that helps both recruitees and recruiters connect.
            We have two login based roles, one for Admin and one for User.
            The user can apply for various jobs and the admin can post the job positions that are open. 
            The user has a profile where you can see his details as well as his resume. 
            The company has a profile including contact details and their description.
            This is a great website for recruiters as well as recruitees. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
