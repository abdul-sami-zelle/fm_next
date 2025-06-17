'use client'

import React, { useState } from "react";
import './BedCareFAQ.css';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

const BedCareFAQ = () => {
    const bedcarefaq = [
        {
            que: 'Q : When should I purchase the protection plan?',
            ans: 'You should purchase the plan at checkout or within 14 days of delivery. This ensures coverage starts right away and protects against unexpected damage from day one. After 14 days, the plan can no longer be added.'
        },
        {
            que: 'Q : When should I purchase the protection plan?',
            ans: 'You should purchase the plan at checkout or within 14 days of delivery. This ensures coverage starts right away and protects against unexpected damage from day one. After 14 days, the plan can no longer be added.'
        },
        {
            que: 'Q : When should I purchase the protection plan?',
            ans: 'You should purchase the plan at checkout or within 14 days of delivery. This ensures coverage starts right away and protects against unexpected damage from day one. After 14 days, the plan can no longer be added.'
        },
        {
            que: 'Q : When should I purchase the protection plan?',
            ans: 'You should purchase the plan at checkout or within 14 days of delivery. This ensures coverage starts right away and protects against unexpected damage from day one. After 14 days, the plan can no longer be added.'
        },
        {
            que: 'Q : When should I purchase the protection plan?',
            ans: 'You should purchase the plan at checkout or within 14 days of delivery. This ensures coverage starts right away and protects against unexpected damage from day one. After 14 days, the plan can no longer be added.'
        },
    ]
    const [currentIndex, setCurrentIndex] = useState(0)
    return (
        <div className="bad-care-faq-main-conitainer">
            <span className="bad-care-faq-heading">
                <IoChatbubbleEllipsesSharp size={40} color="var(--tertiary-color)" />
                <h3>Frequently Asked Questions</h3>
            </span>

            <div className="bed-care-faqs">
                {bedcarefaq.map((item, index) => (
                    <div key={index} className={`bed-care-faq-single-item ${currentIndex === index ? 'remove-ans-bg' : ''}`}>
                        <div className="bef-care-faq-que" onClick={() => setCurrentIndex((prevIndex => prevIndex === index ? null : index))}>
                            <h3>{item.que}</h3>
                            <IoIosArrowUp size={20} color="var(--tertiary-color)" className={`bed-care-faq-arrow ${currentIndex === index ? 'rotate-bed-care-faq-arrow' : ''}`} />
                        </div>
                        <div className={`bed-care-faq-ans ${currentIndex === index ? 'show-ans' : ''}`}>
                            <p>{item.ans}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BedCareFAQ;