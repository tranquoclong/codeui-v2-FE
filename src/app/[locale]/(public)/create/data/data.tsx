export const defaultCodes: Record<string, { html: string; css: string }> = {
  button: {
    html: `<button class="button">
  Button
</button>`,
    css: `.button {
  cursor: pointer;
}`
  },
  switch: {
    html: `<label class="switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>`,
    css: `/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: white;
  transition: .4s;
}

.switch input:checked + .slider {
  background-color: #2196F3;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.switch input:checked + .slider:before {
  transform: translateX(1.5em);
}`
  },
  checkbox: {
    html: `<label class="container">
  <input type="checkbox" checked="checked">
  <div class="checkmark"></div>
</label>`,
    css: `/* Hide the default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

/* Create a custom checkbox */
.checkmark {
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid white;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}`
  },
  card: {
    html: `<div class="card"></div>`,
    css: `.card {
  width: 190px;
  height: 254px;
  background: lightgrey;
}`
  },
  loader: {
    html: `<div class="loader"></div>`,
    css: `.loader {
  
}`
  },
  input: {
    html: `<input type="text" name="text" class="input">`,
    css: `.input {
  max-width: 190px;
}`
  },
  form: {
    html: `<form class="form">
    <input type="text" class="input">
    <input type="text" class="input"> 
    <button>Submit</button>
</form>`,
    css: `.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form button {
  align-self: flex-end;
}
    `
  },
  pattern: {
    html: `<div class="container"></div>`,
    css: `.container {
  width: 100%;
  height: 100%;
  /* Add your background pattern here */
  background: lightblue;
}`
  },
  radio: {
    html: `<div class="radio-input">
  <input type="radio" id="value-1" name="value-radio" value="value-1">
  <input type="radio" id="value-2" name="value-radio" value="value-2">
  <input type="radio" id="value-3" name="value-radio" value="value-3">
</div>`,
    css: `.radio-input input {

}`
  },
  tooltip: {
    html: `<div class="tooltip-container">
  <span class="tooltip">codeui</span>
  <span class="text">Tooltip</span>
</div>`,
    css: `/* This is an example, feel free to delete this code */
.tooltip-container {
  --background: #22d3ee;
  position: relative;
  background: var(--background);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 17px;
  padding: 0.7em 1.8em;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  background: var(--background);
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--background);
}

.tooltip-container:hover .tooltip {
  top: -100%;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}`
  }
}

export const TYPES = [
  {
    id: 1,
    value: 'button',
    label: 'Button',
    icon: (
      <svg
        width={83}
        height={34}
        viewBox='0 0 83 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={83} height={34} rx={17} fill='currentColor' />
        <rect x={25} y={15} width={46} height={5} rx='2.5' fill='white' />
        <rect x={11} y={14} width={7} height={7} rx='3.5' fill='white' />
      </svg>
    )
  },
  {
    id: 2,
    value: 'switch',
    label: 'Toggle switch',
    icon: (
      <svg
        width={54}
        height={28}
        viewBox='0 0 54 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={54} height={28} rx={14} fill='currentColor' />
        <circle cx={15} cy={14} r={8} fill='white' />
      </svg>
    )
  },
  {
    id: 3,
    value: 'checkbox',
    label: 'Checkbox',
    icon: (
      <svg
        width={30}
        height={30}
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect width={30} height={30} rx={9} fill='currentColor' />
        <path
          d='M6 16.0481L12.375 22.1667L24.3005 9.99608L22.286 8L12.3396 18.1759L7.97625 14.0152L6 16.0481Z'
          fill='white'
        />
      </svg>
    )
  },
  {
    id: 4,
    value: 'card',
    label: 'Card',
    icon: (
      <svg
        width={32}
        height={44}
        viewBox='0 0 32 44'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x={32} width={44} height={32} rx={4} transform='rotate(90 32 0)' fill='currentColor' />
        <rect x={6} y={7} width={20} height={4} rx={2} fill='white' />
        <rect x={6} y={14} width={11} height={4} rx={2} fill='white' />
      </svg>
    )
  },
  {
    id: 5,
    value: 'loader',
    label: 'Loader',
    icon: (
      <svg
        width={41}
        height={41}
        viewBox='0 0 41 41'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <path
          d='M20.5002 3.41675C20.9533 3.41675 21.3878 3.59673 21.7082 3.91711C22.0285 4.23748 22.2085 4.672 22.2085 5.12508V10.2501C22.2085 10.7032 22.0285 11.1377 21.7082 11.4581C21.3878 11.7784 20.9533 11.9584 20.5002 11.9584C20.0471 11.9584 19.6126 11.7784 19.2922 11.4581C18.9718 11.1377 18.7918 10.7032 18.7918 10.2501V5.12508C18.7918 4.672 18.9718 4.23748 19.2922 3.91711C19.6126 3.59673 20.0471 3.41675 20.5002 3.41675V3.41675ZM20.5002 29.0417C20.9533 29.0417 21.3878 29.2217 21.7082 29.5421C22.0285 29.8625 22.2085 30.297 22.2085 30.7501V35.8751C22.2085 36.3282 22.0285 36.7627 21.7082 37.0831C21.3878 37.4034 20.9533 37.5834 20.5002 37.5834C20.0471 37.5834 19.6126 37.4034 19.2922 37.0831C18.9718 36.7627 18.7918 36.3282 18.7918 35.8751V30.7501C18.7918 30.297 18.9718 29.8625 19.2922 29.5421C19.6126 29.2217 20.0471 29.0417 20.5002 29.0417V29.0417ZM35.2943 11.9584C35.5209 12.3508 35.5823 12.8171 35.465 13.2547C35.3478 13.6923 35.0615 14.0655 34.6691 14.292L30.2308 16.8545C30.0365 16.9684 29.8215 17.0428 29.5983 17.0733C29.3751 17.1039 29.148 17.0899 28.9302 17.0323C28.7124 16.9747 28.5081 16.8746 28.3292 16.7378C28.1502 16.6009 28.0001 16.43 27.8874 16.2349C27.7748 16.0398 27.7018 15.8244 27.6728 15.6009C27.6437 15.3775 27.6592 15.1506 27.7182 14.9331C27.7772 14.7157 27.8787 14.5121 28.0167 14.3341C28.1548 14.156 28.3267 14.007 28.5225 13.8957L32.9608 11.3332C33.3531 11.1066 33.8194 11.0452 34.257 11.1625C34.6947 11.2798 35.0678 11.5661 35.2943 11.9584V11.9584ZM13.1031 24.7709C13.3296 25.1633 13.391 25.6296 13.2738 26.0672C13.1565 26.5048 12.8702 26.878 12.4778 27.1045L8.0396 29.667C7.84524 29.7809 7.63026 29.8553 7.40705 29.8858C7.18383 29.9164 6.95678 29.9024 6.73897 29.8448C6.52115 29.7872 6.31688 29.6871 6.13792 29.5503C5.95895 29.4134 5.80882 29.2425 5.69617 29.0474C5.58352 28.8523 5.51057 28.6369 5.48154 28.4134C5.4525 28.19 5.46794 27.9631 5.52697 27.7457C5.58599 27.5282 5.68745 27.3246 5.82548 27.1466C5.96352 26.9685 6.13541 26.8195 6.33127 26.7082L10.7695 24.1457C11.1619 23.9191 11.6282 23.8577 12.0658 23.975C12.5034 24.0923 12.8766 24.3786 13.1031 24.7709ZM35.2943 29.0417C35.0678 29.4341 34.6947 29.7204 34.257 29.8377C33.8194 29.9549 33.3531 29.8935 32.9608 29.667L28.5225 27.1045C28.1333 26.8763 27.8502 26.5035 27.7349 26.0674C27.6196 25.6313 27.6815 25.1672 27.907 24.7766C28.1326 24.3859 28.5035 24.1003 28.9389 23.9821C29.3743 23.8639 29.8387 23.9227 30.2308 24.1457L34.6691 26.7082C35.0615 26.9347 35.3478 27.3078 35.465 27.7455C35.5823 28.1831 35.5209 28.6494 35.2943 29.0417ZM13.1031 16.2292C12.8766 16.6216 12.5034 16.9079 12.0658 17.0252C11.6282 17.1424 11.1619 17.081 10.7695 16.8545L6.33127 14.292C6.13541 14.1806 5.96352 14.0317 5.82548 13.8536C5.68745 13.6755 5.58599 13.4719 5.52697 13.2545C5.46794 13.0371 5.4525 12.8101 5.48154 12.5867C5.51057 12.3633 5.58352 12.1478 5.69617 11.9527C5.80882 11.7576 5.95895 11.5867 6.13792 11.4499C6.31688 11.313 6.52115 11.2129 6.73897 11.1553C6.95678 11.0977 7.18383 11.0838 7.40705 11.1143C7.63026 11.1449 7.84524 11.2192 8.0396 11.3332L12.4778 13.8957C12.8702 14.1222 13.1565 14.4953 13.2738 14.933C13.391 15.3706 13.3296 15.8369 13.1031 16.2292Z'
          fill='currentColor'
        />
      </svg>
    )
  },
  {
    id: 6,
    value: 'input',
    label: 'Input',
    icon: (
      <svg
        width={76}
        height={30}
        viewBox='0 0 76 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x='1.5' y='1.5' width={73} height={27} rx='7.5' stroke='currentColor' strokeWidth={3} />
        <rect x={10} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
        <rect x={19} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
        <rect x={28} y={15} width={7} height={7} rx='3.5' fill='currentColor' />
      </svg>
    )
  },
  {
    id: 7,
    value: 'form',
    label: 'Form',
    icon: (
      <svg
        width={60}
        height={60}
        viewBox='0 0 97 97'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect x={18} y={42} width={62} height={12} rx={6} fill='currentColor' />
        <rect x={18} y={22} width={62} height={12} rx={6} fill='currentColor' />
        <rect x={45} y={62} width={35} height={13} rx='6.5' fill='currentColor' />
      </svg>
    )
  },
  {
    id: 8,
    value: 'pattern',
    label: 'Pattern',
    icon: (
      <svg
        width={60}
        viewBox='0 0 38 37'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <rect y='14.1421' width={20} height={4} rx={2} transform='rotate(-45 0 14.1421)' fill='currentColor' />
        <rect
          x='1.66541'
          y='22.4767'
          width='29.4315'
          height={4}
          rx={2}
          transform='rotate(-45 1.66541 22.4767)'
          fill='currentColor'
        />
        <rect
          x='2.99329'
          y='32.1488'
          width='42.6463'
          height={4}
          rx={2}
          transform='rotate(-45 2.99329 32.1488)'
          fill='currentColor'
        />
        <rect
          x='12.0931'
          y='33.049'
          width='31.0501'
          height={4}
          rx={2}
          transform='rotate(-45 12.0931 33.049)'
          fill='currentColor'
        />
        <rect x={21} y='34.1421' width={20} height={4} rx={2} transform='rotate(-45 21 34.1421)' fill='currentColor' />
      </svg>
    )
  },
  {
    id: 9,
    value: 'radio',
    label: 'Radio buttons',
    icon: (
      <svg
        width={70}
        viewBox='0 0 80 70'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <circle cx='40.2632' cy={35} r={10} fill='currentColor' />
        <circle cx='65.5263' cy={35} r={10} fill='currentColor' />
        <circle cx={15} cy={35} r={10} fill='currentColor' />
        <circle cx={15} cy={35} r='5.78947' fill='#F6F6F6' />
      </svg>
    )
  },
  {
    id: 10,
    value: 'tooltip',
    label: 'Tooltips',
    icon: (
      <svg
        height={60}
        viewBox='0 0 56 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='max-w-[70px] mb-2.5 transition-colors duration-300'
      >
        <path
          d='M5 0C2.23858 0 0 2.23858 0 5V12C0 14.7614 2.23858 17 5 17H23.8508L27.3231 20.4723C27.8503 20.9996 28.7051 20.9996 29.2323 20.4723L32.7047 17H51C53.7614 17 56 14.7614 56 12V5C56 2.23858 53.7614 0 51 0H5Z'
          fill='currentColor'
        />
        <path
          d='M8 8.5C8 7.67157 8.67157 7 9.5 7H46.5C47.3284 7 48 7.67157 48 8.5C48 9.32843 47.3284 10 46.5 10H9.5C8.67157 10 8 9.32843 8 8.5Z'
          fill='white'
        />
      </svg>
    )
  }
]
