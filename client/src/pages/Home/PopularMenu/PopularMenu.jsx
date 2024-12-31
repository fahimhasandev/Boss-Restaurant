import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   fetch('menu.json')
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setMenuData(data.filter((item) => item.category === 'popular'))
  //     );
  // }, []);

  //custom hook
  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular')
  return (
    <section className='mb-12'>
      <SectionTitle heading={'From Our Menu'} subheading={'Popular items'} />
      <div className='grid md:grid-cols-2 gap-10'>
        {popular.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
