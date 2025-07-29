// Shipping options for the checkout page

export interface ShippingOption {
    id: number;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
    isTracked: boolean;
    isInternational: boolean;
}

export const ukShippingOptions: ShippingOption[] = [
    {
        id: 1,
        name: 'Standard Shipping',
        description: 'Royal Mail 2nd Class',
        price: 2.99,
        estimatedDays: '3-5 business days',
        isTracked: false,
        isInternational: false,
    },
    {
        id: 2,
        name: 'Express Tracked Shipping',
        description: 'Royal Mail Tracked 24',
        price: 4.99,
        estimatedDays: '1-2 business days',
        isTracked: true,
        isInternational: false,
    },
    {
        id: 3,
        name: 'Next Day Delivery',
        description: 'Royal Mail Special Delivery Guaranteed by 1pm',
        price: 12.99,
        estimatedDays: 'Next business day',
        isTracked: true,
        isInternational: false,
    },
];

export const internationalShippingOptions: ShippingOption[] = [
    {
        id: 4,
        name: 'International Standard',
        description: 'Royal Mail International Standard',
        price: 8.99,
        estimatedDays: '7-10 business days',
        isTracked: false,
        isInternational: true,
    },
    {
        id: 5,
        name: 'International Tracked',
        description: 'Royal Mail International Tracked & Signed',
        price: 14.99,
        estimatedDays: '5-7 business days',
        isTracked: true,
        isInternational: true,
    },
];

// All shipping options combined
export const shippingOptions: ShippingOption[] = [
    ...ukShippingOptions,
    ...internationalShippingOptions,
];

// Function to get shipping option by ID
export const getShippingOptionById = (id: number): ShippingOption | undefined => {
    return shippingOptions.find(option => option.id === id);
};

// Function to get shipping options based on country
export const getShippingOptionsByCountry = (country: string): ShippingOption[] => {
    if (country === 'United Kingdom') {
        return ukShippingOptions;
    }
    return internationalShippingOptions;
};

// Function to calculate shipping cost based on cart total and selected shipping option
export const calculateShippingCost = (cartTotal: number, selectedShippingOptionId: number): number => {
    const option = getShippingOptionById(selectedShippingOptionId);
    if (!option) return 0;

    // Free shipping on orders over £30 for UK Standard and Express shipping only
    if (cartTotal >= 30 && !option.isInternational && (selectedShippingOptionId === 1 || selectedShippingOptionId === 2)) {
        return 0;
    }

    return option.price;
};
