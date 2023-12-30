import React from 'react';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { MdOutlinePayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: 'Shipping Details',
            icon: <MdLocalShipping size={25} />
        },
        {
            label: 'Confirm Order',
            icon: <GiConfirmed size={25} />
        },
        {
            label: 'Payment',
            icon: <MdOutlinePayment size={25} />
        }
    ];

    return (
        <Stepper alternativeLabel activeStep={activeStep}>
            {
                steps.map((step, index) => (
                    <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                        <StepLabel style={{ color: activeStep >= index ?"rgb(67,56,202)":"rgba(0,0,0,0.649)" }} icon={step.icon}>{step.label}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    )
};

export default CheckoutSteps;
