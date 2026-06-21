import styles from './Step1_UserData.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import GoogleIcon from 'shared/assets/images/Google.svg';
import AppleIcon from 'shared/assets/images/Apple.svg';
import LightBulb from 'shared/assets/images/light-bulb.svg';
import { EyeIcon } from '@/shared/ui/Icons/EyeIcon/EyeIcon';
import { EyeSlashIcon } from '@/shared/ui/Icons/EyeSlashIcon/EyeSlashIcon';
import clsx from 'clsx';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Step1_UserDataProps {
  /**Сабмит при клике на кнопку*/
  onSubmit: () => void;
  /**Доп.классы */
  className?: string;
}

export const Step1_UserData = ({ onSubmit, className }: Step1_UserDataProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    /**Добавить валидацию */
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    /** Добавить валидацию */
    setEmail(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /** Добавить валидацию */
    onSubmit();
  };

  const handleTooglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={clsx(className, styles.form)}>
        <div className={styles.authButtons}>
          <Button type="button" className={styles.socialButton}>
            <img src={GoogleIcon} alt="" aria-hidden={true} />
            <span>Продолжить с Google</span>
          </Button>
          <Button type="button" className={styles.socialButton}>
            <img src={AppleIcon} alt="" aria-hidden={true} />
            <span>Продолжить с Apple</span>
          </Button>
        </div>

        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span>или</span>
          <div className={styles.line}></div>
        </div>

        <div className={styles.inputs}>
          <label className={styles.inputLabel}>
            Email
            <Input
              onChange={handleEmailChange}
              value={email}
              className={styles.input}
              type="email"
              placeholder="Введите email"
            />
          </label>
          <label className={styles.inputLabel}>
            Пароль
            <Input
              iconPosition="right"
              placeholder="Придумайте надёжный пароль"
              onChange={handlePasswordChange}
              value={password}
              className={styles.input}
              type={isPasswordVisible ? 'text' : 'password'}
              icon={
                <button type="button" onClick={handleTooglePassword}>
                  {isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              }
            />
          </label>
        </div>
        <Button type="submit" buttonType="primary" className={styles.primaryButton}>
          Далее
        </Button>
      </form>
      <section className={styles.infoSection}>
        <img src={LightBulb} alt="" aria-hidden={true} />
        <div className={styles.heroContent}>
          <h2 className={styles.title}>Добро пожаловать в SkillSwap!</h2>
          <p className={styles.description}>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
      </section>
    </div>
  );
};
