import { Modal } from './modal';
interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
  mealsData: any;
}
export const Sidebar: React.FC<Props> = ({
  isOpen,
  toggleSidebar,
  mealsData,
}) => {
  return (
    isOpen && (
      <Modal
        open={isOpen}
        onClose={toggleSidebar}
        showCloseIcon
      >
        <div className='overflow-y-auto'>
          <h2 className='text-sm font-medium mb-1 py-1'>
            {mealsData?.strMeal}
          </h2>
          <img
            src={mealsData?.strMealThumb}
            className='w-full h-[300px] object-cover'
          />
          <div className='flex gap-2 flex-wrap mt-1'>
            {mealsData?.strTags?.split(',').map((tag: string) => {
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              console.log(tag);

              return (
                <div
                  key={tag}
                  className={` opacity-60 text-white font-semibold px-1 py-0.5 rounded min-w-6`}
                  style={{
                    backgroundColor: randomColor,
                    border: `2px solid ${randomColor}`,
                    borderRadius: '24px',
                  }}
                >
                  <p className='text-xs text-center'>{tag}</p>
                </div>
              );
            })}
          </div>
          <div className='break-words'>
            <table className='min-w-full bg-white border border-none'>
              <tbody>
                <tr>
                  <td className='text-sm py-2 px-4'>Category</td>
                  <td className='text-sm py-2 px-4'>
                    {mealsData?.strCategory}
                  </td>
                </tr>
                <tr>
                  <td className='text-sm py-2 px-4'>Area</td>
                  <td className='text-sm py-2 px-4'>{mealsData?.strArea}</td>
                </tr>
                <tr>
                  <td className='text-sm py-2 px-4'>Youtube</td>
                  <td className='text-sm py-2 px-4  break-words whitespace-normal'>
                    <div className='max-w-[260px]'>
                      <a
                        href={mealsData?.strYoutube}
                        target='_blank'
                      >
                        {mealsData?.strYoutube}
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-sm py-2 px-4'>Recipe</td>
                  <td className='text-sm py-2 px-4 break-words whitespace-normal'>
                    <div className='max-w-[260px]'>
                      <a
                        href={mealsData?.strSource}
                        target='_blank'
                      >
                        {mealsData?.strSource}
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className='text-sm mt-2 px-1 text-justify'
            style={{
              border: '1px solid #ccc',
            }}
          >
            {mealsData?.strInstructions}
          </div>
        </div>
      </Modal>
    )
  );
};

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'pink', 'orange'];
