# Current css styling in the todo-app:
- The app is using very simple css styling, declaring a main App.css file where a lot of classes are declared and used
in the whole project.
- It's hard to maintain a single styling css file, the more components created the bigger this file will be and less readable.
- You always need to go to the App.css in order to see what css properties are set, but sometimes it is
better to look at an HTML element and directly tell which styling it has, this is the tailwind works.
- If the development team gets bigger, having one big css file leads to a lot of conflicts as more developer might modify 
the file at the same time.

# Tailwind pros:
- Tailwind is a css library that offers a lot of ready-to-use components.
- Having flex integrated it's also responsive and very easy to use.
- It has a very detailed documentation, which makes it even easier to learn.
- As tailwind provides alot of utilities, the unused utilities will be deleted thanks to the JIT "just in time" compiler,which leads
to smaller bundle size and better browser performance.

# Integrating tailwind:
It is pretty much easy to integrate tailwind in the project, according to the step by step documentation
we need to install the library using node package manager, to create a config file, import tailwind and 
it's ready to use.

# Return on Investment
Using tailwind will:
 - reduce the time of maintaining shared css classes and the pain that accompany central files.
 - reduce the time spent on stackoverflow trying to find out why some stylings are not working together.
 - make the css styling readable and easy to modify.
 - Having learned Tailwind and understood the utility-first approach, the way css is used in the team will be pretty much the same.
