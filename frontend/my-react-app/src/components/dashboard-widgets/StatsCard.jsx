import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

export function StatsCard({ title, value, icon: Icon, iconColor, borderColor, trend }) {
  return (
    <Card className={cn("border-l-4", borderColor)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            )}
          </div>
          {Icon && (
            <Icon className={cn("w-8 h-8", iconColor)} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
