import React from "react";
import './ProtectYourInvestment.css';

const ProtectYourInvestment = () => {
    const investmentProtect = [
        {
            title: 'Mechanical And Structural Breakdowns To Fabric, Leather, Vinyl Upholstery Or Solid Surface Furniture As A Result Of',
            options: [
                {name: 'Breakage of frames, panels, or springs', fabric: true, leather: true, woodAndOther: true},
                {name: 'Breakage of frames, panels, or springs', fabric: true, leather: true, woodAndOther: true},
                {name: 'Breakage of frames, panels, or springs', fabric: true, leather: true, woodAndOther: true},
                {name: 'Breakage of frames, panels, or springs', fabric: false, leather: false, woodAndOther: true},
                {name: 'Breakage of frames, panels, or springs', fabric: false, leather: false, woodAndOther: true},
                {name: 'Breakage of frames, panels, or springs', fabric: false, leather: false, woodAndOther: true},
            ]
        },
        {
            title: 'A Specific Post-Delivery Incident Which Occurs During Normal Residential Use Resulting In Accidental Damage',
            options: [
                {name: 'All stain types, including dye bleed and dye transfer onto or into upholstery fabric or vinyl', fabric: true, leather: true, woodAndOther: true},
                {name: 'Punctures, rips or burns', fabric: true, leather: true, woodAndOther: true},
                {name: 'Liquid marks or rings', fabric: true, leather: true, woodAndOther: true},
                {name: 'Household heat marks', fabric: false, leather: false, woodAndOther: true},
                {name: 'Gouges, dents, scratches or chips that penetrate the finish exposing the substrate', fabric: false, leather: false, woodAndOther: true},
                {name: 'Damage caused by nail polish remover', fabric: false, leather: false, woodAndOther: true},
                {name: 'Checking, cracking, bubbling or peeling of finish caused by a specific incident', fabric: false, leather: false, woodAndOther: true},
                {name: 'Glass or mirror chipping, breakage or scratches', fabric: false, leather: false, woodAndOther: true},
            ]
        },
    ]
    return (
        <div>
            <div>
                <div>
                    <h3>Protect Your Investment</h3>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProtectYourInvestment;