import { girlsHostels, boysHostels, hostelFacilities, rectors } from '../../data/mockData';
import './About.css';

export default function AboutPage() {
    return (
        <div className="page-wrapper about-page">
            <div className="container">
                <div className="about-header-main">
                    <h1>About Us</h1>
                </div>

                {/* Girls Hostel */}
                <div className="hostel-section-wrapper">
                    <div className="hostel-grey-header">
                        <h2>Girls Hostel</h2>
                    </div>

                    <div className="table-container">
                        <table className="about-custom-table">
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name of the Hostel</th>
                                    <th>Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {girlsHostels.map((h, i) => (
                                    <tr key={h.id}>
                                        <td>{i + 1}</td>
                                        <td>{h.name}</td>
                                        <td>{h.capacity}</td>
                                    </tr>
                                ))}
                                <tr className="total-row-custom">
                                    <td colSpan={1}><strong>Total Capacity</strong></td>
                                    <td></td>
                                    <td><strong>288</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="facilities-section-custom">
                        <h3>Facilities Provided</h3>
                        <ol className="numbered-list-custom">
                            {hostelFacilities.girls.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="rector-section-custom">
                        <h3>Rector-Girls Hostel</h3>
                        <p><strong>{rectors.girls.name}, {rectors.girls.designation}.</strong></p>
                    </div>
                </div>

                {/* Boys Hostel */}
                <div className="hostel-section-wrapper">
                    <div className="hostel-grey-header">
                        <h2>Boys Hostel</h2>
                    </div>

                    <div className="table-container">
                        <table className="about-custom-table">
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name of the Hostel</th>
                                    <th>Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boysHostels.map((h, i) => (
                                    <tr key={h.id}>
                                        <td>{i + 1}</td>
                                        <td>{h.name}</td>
                                        <td>{h.capacity}</td>
                                    </tr>
                                ))}
                                <tr className="total-row-custom">
                                    <td colSpan={1}><strong>Total Capacity</strong></td>
                                    <td></td>
                                    <td><strong>336</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="facilities-section-custom">
                        <h3>Facilities Provided</h3>
                        <ol className="numbered-list-custom">
                            {hostelFacilities.boys.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="rector-section-custom">
                        <h3>Rector-Boys Hostel</h3>
                        <p><strong>{rectors.boys.name}- {rectors.boys.designation} (Mobile No.-{rectors.boys.contact})</strong></p>
                    </div>
                </div>

                {/* Admission Procedure */}
                <div className="admission-section-wrapper">
                    <div className="hostel-grey-header">
                        <h2>Admission Procedure</h2>
                    </div>
                    <div className="admission-content-custom">
                        <p><strong>Hostel Admissions are done according to marks secured in previous academic year such as SSC Board Exam, First Year, Second Year.</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
