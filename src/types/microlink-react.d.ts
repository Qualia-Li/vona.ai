declare module '@microlink/react' {
  interface MicrolinkCardProps {
    url: string;
    size?: 'small' | 'large' | 'normal';
    media?: string[];
    className?: string;
    loading?: () => JSX.Element;
  }
  
  const MicrolinkCard: React.FC<MicrolinkCardProps>;
  export default MicrolinkCard;
} 