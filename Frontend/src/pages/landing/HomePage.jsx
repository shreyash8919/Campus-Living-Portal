import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiShield, FiSun, FiWifi, FiDroplet, FiUser } from 'react-icons/fi';
import InstitutionalSlider from '../../components/InstitutionalSlider';
import NoticeBoard from '../../components/NoticeBoard';
import ResidentDigitalCharter from '../../components/ResidentDigitalCharter';

import { girlsHostels, boysHostels, hostelFacilities, rectors, publicNotices } from '../../data/mockData';
import './Landing.css';
import './AboutUsSection.css';

export default function HomePage() {
    const facilityIcons = {
        'Sanitary Napkin Vending Machine': <FiShield />,
        'Solar Water Heater': <FiSun />,
        'CCTV Camera': <FiWifi />,
        'Aqua Guard Water Filter': <FiDroplet />,
        'Mess Facility': <FiBookOpen />,
    };

    return (
        <div className="page-wrapper landing-page">
            {/* Slider and Notice Board Section */}
            <div className="container">
                <div className="slider-wrapper-flex">
                    <InstitutionalSlider />
                    <div className="notice-board-side">
                        <NoticeBoard notices={publicNotices} />
                    </div>
                </div>
            </div>

            {/* About Us and Digital Charter Section */}
            <section className="section-about-us">
                <div className="container">
                    <div className="about-charter-flex">
                        <div className="about-us-container-shift">
                            <div className="about-header-bar">
                                <h2>About Us</h2>
                            </div>
                            <div className="about-content-box">
                                <p>
                                    Government Polytechnic,Awasari (Khurd) provides well-planned and secure hostel facilities to ensure a comfortable and conducive living environment for students coming from rural, tribal, and distant regions.<br /><br /> The institute offers separate hostel accommodations for boys and girls within the campus premises. The Girls’ Hostel has a capacity of 288 students, while the Boys’ Hostel can accommodate 336 students.<br /><br /> Both hostels are designed to maintain a safe, disciplined, and academically supportive atmosphere for students. They are equipped with spacious and well-ventilated rooms, adequate water supply and sanitation facilities, mess and dining arrangements, and common areas for recreation and interaction. Located within the lush green campus at the foothills of the Sahyadri ranges, the hostel environment promotes focused learning along with overall personality development.<br /><br /> The institute management remains committed to ensuring students’ comfort, safety, and well-being, as the hostel facilities play a vital role in supporting their academic journey while fostering discipline, leadership qualities, and a strong sense of community living.
                                </p>
                            </div>
                        </div>
                        <div className="charter-side">
                            <ResidentDigitalCharter />
                        </div>
                    </div>
                </div>
            </section>



            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <h4>Government Polytechnic Awasari (Kh.)</h4>
                            <p>शासकीय तंत्रनिकेतन, अवसरी (खु.)</p>
                            <p className="footer-codes">
                                DTE Code: 6011 | MSBTE Code: 1051
                            </p>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <Link to="/about">About</Link>
                            <Link to="/notices">Notices</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/register">register</Link>
                        </div>
                        <div className="footer-col">
                            <h4>Contact</h4>
                            <p>📧 gpawasari@gmail.com</p>
                            <p>📞 9970723236</p>
                            <p>📍 Awasari (Kh.), Maharashtra</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2025 Government Polytechnic Awasari (Kh.). All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
