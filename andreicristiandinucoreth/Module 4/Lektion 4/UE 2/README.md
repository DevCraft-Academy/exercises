# UE 2 - Evaluating Transition to TailwindCSS

1. Current assessment
    - How is styling in the project done right now?
        - All styles are defined in one file, with the classes then used in the various components
    - Current difficulties or challenges with styling
        - Change to a css class will potentially have side effects in other components
        - There is no naming convention, there are classes named with PascalCase as well as some with kebab-case
2. Advantages of Tailwind CSS:
    - Consistent design system: Tailwind CSS enforces a consistent design system by using utility classes, reducing the chances of style inconsistencies.
    - Faster development: Developers can quickly prototype and build UIs without writing custom CSS, saving time and effort.
    - Highly customizable: Tailwind CSS allows easy customization through configuration files, enabling teams to adapt it to their specific design requirements.
3. Challenges and considerations
    - Technical Implementation
        - Install Tailwind CSS package and initialize it for the app.
        - Configure Tailwind CSS by adding its directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) to the main CSS file and ensuring the React project processes it correctly.
        - Use add-ons/plug-ins for your IDE to support in using Tailwind styles.
    - Development team involvement
        - Tailwind CSS should be presented to them, with the benefits of the change
        - They should have the time and opportunity to play a bit with it to understand why it would be a good change
        - They should all be ok with this change
    - ROI and long term effects
        - There is some effort to be put in in the beginning, to start the transition (upfront cost)
        - Once Tailwind CSS is implemented, development should be faster in terms of styling, as we use pre-defined styles and utility classes instead of writing custom styles every time
        - It's a very trusted library, with much support, both in terms of community and in terms of future development.
    - Decision and Transition Plan
        - Based on all these factors, we should switch to Tailwind CSS
        - Transition Plan:
            1. All developers need basic training on Tailwind and understanding of documentation.
            2. Prepare project (build process) for usage of Tailwind.
            3. All new features should use Tailwind styles instead of manual or inline styles.
            4. All existing components will be transitioned file-by-file to using Tailwind styles.
            5. Once the transition is done, old styles will be removed from the app. 