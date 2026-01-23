import { ProductDropdown } from 'components/Nav/ProductDropdown'

export const getMenu = () => ({
  primaryNav: [
    {
      title: 'Product',
      hasDropdown: true,
      dropdown: <ProductDropdown />,
      dropdownContainerClassName: 'rounded-xl',
    },
    {
      title: 'Pricing',
      url: '/pricing',
    },
    {
      title: 'Enterprise',
      url: '/enterprise',
    },
    {
      title: 'Blog',
      url: '/blog',
    },
    {
      title: 'Trust',
      url: '/trust',
    },
  ],
})
