import React from 'react'
import './FurnitureForBudget.css'
import { url } from '../../../utils/api'
import FurnitureForBudgetShimmer from './FurnitureForBudgetShimmer/FurnitureForBudgetShimmer'
import { useRouter } from 'next/navigation'

const FurnitureForBudget = ({ budgetCardData }) => {
    
    const navigate = useRouter();

    const navigateToDetails = (uid, max_price, category) => {
        navigate.push(`/furniture-for-every-budget?category=${category}&categoryUid=${uid}&max_price=${max_price}`);
    }
    return (
        <div className='furniture-for-budget-main-secton'>
            <div className='furniture-for-budget-heading-section'>
                <h3>Furniture For Every Budget</h3>
                <p>From glam vibes to laid-back comfort, these sofas all have one thing in common—and that’s amazing value.</p>
            </div>
            <div className='furniture-for-budget-card'>
                {budgetCardData && budgetCardData.length > 0 ? (
                    budgetCardData && budgetCardData.map((items, index) => (
                    <div
                        key={index}
                        className='budget-furniturre-card'
                        onClick={() => {
                            navigateToDetails(items.uid, items.max_price, items.category)
                        }}
                    >
                        <div className='budget-furniture-card-img'>
                            <img src={url + items.img} alt='img' effect='blur' />
                        </div>
                        <div className='budget-furniture-card-details'>
                            <p>{items.sale}</p>
                            <button
                            onClick={()=>{
                                navigateToDetails(items.uid,items.max_price,items.category)
                            }}
                            >
                                {items.shopNow}
                                <div className='shop-now-btn-under-line'></div>
                            </button>
                        </div>
                    </div>
                ))
                ) : (
                    Array.from({length: 3}).map((_, index) => (
                        <FurnitureForBudgetShimmer key={index} />
                    ))
                )}
                
            </div>
        </div>
    )
}

export default FurnitureForBudget