import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarView({ deadlines = {}, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hasDeadline = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateKey = formatDateKey(date);
    return deadlines[dateKey] !== undefined;
  };

  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-border bg-muted/30"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDeadlineDay = hasDeadline(day);
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && formatDateKey(selectedDate) === formatDateKey(date);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-20 border border-border p-2 cursor-pointer transition-all ${
            isDeadlineDay ? 'bg-[#FFD700]/20 hover:bg-[#FFD700]/30' : 'bg-white hover:bg-muted/50'
          } ${isSelected ? 'ring-2 ring-[#800020]' : ''}`}
        >
          <div className={`text-sm font-medium ${isDeadlineDay ? 'text-[#800020]' : ''}`}>
            {day}
          </div>
          {isDeadlineDay && (
            <div className="mt-1">
              <div className="w-2 h-2 bg-[#800020] rounded-full"></div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{monthName}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-[#800020] text-white p-2 text-center text-sm font-semibold border border-[#9B1B30]">
              {day}
            </div>
          ))}
          {days}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FFD700]/20 border border-border"></div>
            <span>Has deadline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-border"></div>
            <span>No deadline</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendar Deadlines</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Track submission deadlines
            </CardDescription>
          </div>
          <CalendarIcon className="w-6 h-6 text-[#FFD700]" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {renderCalendar()}
      </CardContent>
    </Card>
  );
}
