const Container = (props) => (
  <div className="container">{props.children}</div>
);

const Switch = (props) => (
  <label className='switch'>
      <input type="checkbox" checked={props.checked} />
      <div className={`slider ${props.round ? 'round' : ''}`} />
    </label>
);

const FilterElement = ({children, ...rest}) => (
  <div className='filter element'>
    <div className='toggle'>
      <Switch {...rest}/>
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
);

const Demo = () => (
    <Container>
      <FilterElement round>
        <span>You can put whatever content you want here</span>
      </FilterElement>
      <hr />
      <FilterElement>
        <span>You can put whatever content you want here</span>
      </FilterElement>
      <hr />
      <FilterElement round>
          <span>You can put whatever content you want here</span>
      </FilterElement>
    </Container>
);

