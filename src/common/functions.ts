//для преобразования числа в читаемый для пользователя формат
export const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'decimal', minimumFractionDigits: 2 }).format(num);
};

//для преобразования количества в читаемый формат
export const formatQuantity = (num: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
};
