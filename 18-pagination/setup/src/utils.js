const paginate = ({ data }) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(data.length / itemsPerPage);
  const newData = Array.from({ length: pages });
  
}

export default paginate
